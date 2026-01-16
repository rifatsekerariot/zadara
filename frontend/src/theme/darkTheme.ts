import { ThemeConfig } from 'antd';

export const darkTheme: ThemeConfig = {
    algorithm: [], // We will use Dark Algorithm in App.tsx not here, or define tokens explicitly
    token: {
        colorPrimary: '#0f62fe', // IBM Blue
        colorBgBase: '#1f1f1f', // Dark Gray
        colorTextBase: '#ffffff',
        colorSuccess: '#24a148', // Matrix Green
        colorError: '#da1e28', // Critical Red
        fontFamily: 'Inter, Roboto, sans-serif',
        borderRadius: 2, // Sharp edges for enterprise feel
    },
    components: {
        Layout: {
            headerBg: '#161616',
            siderBg: '#161616',
            bodyBg: '#1f1f1f',
        },
        Menu: {
            darkItemBg: '#161616',
            darkItemSelectedBg: '#393939',
        },
        Tree: {
            directoryNodeSelectedBg: '#393939',
        }
    },
};
