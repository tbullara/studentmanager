import {notification} from "antd"

const openNotificationWithIcon: Function = (type: string, message: string, description: string) => {
    if (type === 'success') {
        notification.success({
            message: message,
            description: description
        });
    }
    else if (type === 'error') {
        notification.error({
            message: message,
            description: description
        });
    }
    else if (type === 'info') {
        notification.info({
            message: message,
            description: description
        });
    }
    else if (type === 'warning') {
        notification.warning({
            message: message,
            description: description
        });
    }
};

export const successNotif: Function = (message: string, description: string) => {
    openNotificationWithIcon('success', message, description);
}

export const errorNotif: Function = (message: string, description: string) => {
    openNotificationWithIcon('error', message, description);
}

export const infoNotif: Function = (message: string, description: string) => {
    openNotificationWithIcon('info', message, description);
}

export const warningNotif: Function = (message: string, description: string) => {
    openNotificationWithIcon('warning', message, description);
}