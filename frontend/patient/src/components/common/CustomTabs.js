import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// format for custom input
// const tabs = [{
//     label: 'Test Response',
//     component: (props) =><div {...props}/> 
// }];
// const tabClasses = {} containing styles for appbar

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabPanel: {
        backgroundColor: theme.palette.primary.main,
        color: 'white'
    },

}));

const CustomTabs = ({ tabs,  ...props }) => {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div className={classes.root}>
            <AppBar position="relative">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="custom tab"
                    className={classes.tabPanel}
                    variant="fullWidth"
                    centered
                >
                    {
                        tabs.map((tab, index) => (
                            <Tab key={index} label={tab.label} {...a11yProps(0)} />
                        ))
                    }
                </Tabs>
            </AppBar>
            {
                tabs.map((tab, index) => (
                    <TabPanel value={value} index={index} key={index}>
                        {tab.component({ ...props, setValue: (val) => setValue(val) })}
                    </TabPanel>
                ))
            }
        </div>
    );
};

export default CustomTabs;