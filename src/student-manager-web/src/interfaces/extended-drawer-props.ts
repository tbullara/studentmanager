import { DrawerProps } from "antd";
import React, { Dispatch, SetStateAction } from "react";

export interface ExtendedDrawerProps extends React.FC<DrawerProps> {
    showDrawer: any;
    setShowDrawer: Dispatch<SetStateAction<boolean>>;
    fetchStudents: () => void;
}
