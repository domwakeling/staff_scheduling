import Box from '@mui/material/Box';

const TabPanel = (props) => {
    const { children, activeTabIndex, index, notPadded, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={activeTabIndex !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {activeTabIndex === index && !notPadded && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
            {activeTabIndex === index && notPadded && (
                <Box sx={{ py: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default TabPanel;
