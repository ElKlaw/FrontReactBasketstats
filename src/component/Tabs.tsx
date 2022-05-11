import { Tab, Tabs } from "@mui/material";
import { blueGrey, teal } from "@mui/material/colors";
import React from "react";
import { styled } from "@mui/styles";
import { important, px } from "csx";

interface StyledTabsProps {
    variant?: 'standard' | 'scrollable' | 'fullWidth',
    children?: React.ReactNode;
    value: any;
    onChange: (event: React.SyntheticEvent, newValue: any) => void;
    centered?: boolean;
}

export const TabsBase = styled((props: StyledTabsProps) => (
    <Tabs
      {...props}
      variant={props.variant ? props.variant : "standard"}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))({
    backgroundColor: 'transparent',
    minHeight: px(35),
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    '& .MuiTabs-indicatorSpan': {
        width: '100%',
        backgroundColor: teal[400]
    },
});

export const SmallTabs = styled((props: StyledTabsProps) => (
    <Tabs
      {...props}
      variant={props.variant ? props.variant : "standard"}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))({
    backgroundColor: 'transparent',
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    '& .MuiTabs-indicatorSpan': {
        width: '100%',
        backgroundColor: teal[400]
    },
});
  
interface StyledTabProps {
    label: string;
    value?: string;
}
  
export const TabBase = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
))({
    color: blueGrey[700],
    fontWeight: 700,
    textTransform: 'none',
    padding: "10px 60px",
    minHeight: px(35),
    '&.Mui-selected': {
        color: important(teal[400])
    },
});

export const SmallTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
))({
    color: blueGrey[700],
    fontWeight: 600,
    textTransform: 'none',
    fontSize: px(12),
    padding: "6px 9px",
    minHeight: px(35),
    '&.Mui-selected': {
        color: important(teal[400])
    },
});