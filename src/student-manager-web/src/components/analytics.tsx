import { Area, Column, FundFlowGraph, Line, Pie, RadialBar, Scatter, Waterfall } from "@ant-design/charts";
import { Col, Row } from "antd"
import { useEffect, useState } from "react";

export const Analytics: () => JSX.Element = () => {
    return (<Row>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <LinePlot/>
        </Col>
        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <ScatterPlot />
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <PieChart />
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <AreaPlot />
        </Col>
    </Row>);
}

const LinePlot: React.FC = () => {
    const data = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 },
    ];

    const config = {
        data,
        height: 400,
        xField: 'year',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
        },
    };

    return <Line {...config}/>
}

const ScatterPlot: React.FC = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        asyncFetch();
    }, []);
    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/antfincdn/aao6XnO5pW/IMDB.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('Data failed FETCH', error);
            });
    };
    var config = {
        appendPadding: 10,
        data: data,
        xField: 'Revenue (Millions)',
        yField: 'Rating',
        shape: 'circle',
        colorField: 'Genre',
        size: 4,
        yAxis: {
            nice: true,
            line: { style: { stroke: '#aaa' } },
        },
        xAxis: {
            min: - 100,
            grid: { line: { style: { stroke: '#eee' } } },
            line: { style: { stroke: '#aaa' } },
        },
    };
    return <Scatter {...config} />;
};

const PieChart: React.FC = () => {
    const data = [
        {
            type: 'Classification One',
            value: 27,
        },
        {
            type: 'Classification Two',
            value: 25,
        },
        {
            type: 'Classification Three',
            value: 18,
        },
        {
            type: 'Classification Four',
            value: 15,
        },
        {
            type: 'Classification Five',
            value: 10,
        },
        {
            type: 'Other',
            value: 5,
        },
    ];

    const config = {
        appendPadding: 10,
        data: data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.75,
        label: {
            type: 'spider',
            labelHeight: 28,
            content: '{name}\n{percentage}',
        },
        interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    };

    return <Pie {...config} />;
};

const AreaPlot: React.FC = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        asyncFetch();
    }, []);
    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    var config = {
        data: data,
        xField: 'timePeriod',
        yField: 'value',
        xAxis: {
            range: [0, 1],
        },
    };
    return <Area {...config} />;
};
