import { Tab, Tabs } from "@material-ui/core";
import { blueGrey, teal } from "@material-ui/core/colors";
import React from "react";
import { withStyles } from "@material-ui/styles";
import { important, px } from "csx";

interface TabsProps {
    value: any
    onChange: (event: React.ChangeEvent<{}>, newValue: any) => void
}

export const TabsBase = withStyles({
    root: {
        minHeight: px(35)
    },
    indicator: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
        '& > span': {
            width: "100%",
            backgroundColor: teal[400]
        }
    }
})((props: TabsProps) => <Tabs {...props} centered TabIndicatorProps={{children: <span />}}/>)

export const TabBase = withStyles({
    root: {
        color: blueGrey[700],
        fontWeight: 700,
        textTransform: 'none',
        padding: "10px 60px",
        minHeight: px(35)
    },
    selected: {
        color: important(teal[400])
    }
})(Tab)


export const SmallTabs = withStyles({
    root: {
        minHeight: px(35)
    },
    indicator: {
        display: "flex",
        justifyContent: "center",
        '& > span': {
            width: "100%",
            backgroundColor: teal[400]
        }
    }
})((props: TabsProps) => <Tabs {...props} centered variant="fullWidth" TabIndicatorProps={{children: <span />}}/>)

export const SmallTab = withStyles({
    root: {
        color: blueGrey[700],
        fontWeight: 600,
        textTransform: 'none',
        fontSize: px(12),
        padding: "6px 9px",
        minHeight: px(35)
    },
    selected: {
        color: important(teal[400])
    }
})(Tab)