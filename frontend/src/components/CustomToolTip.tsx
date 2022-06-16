import React from 'react';
import styled from '@emotion/styled';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';

export default styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    arrow
    placement="right"
    enterDelay={1000}
    enterNextDelay={300}
    classes={{ popper: className }}
  />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 150,
  },
});
