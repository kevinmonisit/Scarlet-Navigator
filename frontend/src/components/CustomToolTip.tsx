import React from 'react';
import styled from '@emotion/styled';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';

export default styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    placement="top"
    arrow
    enterDelay={500}
    classes={{ popper: className }}
    enterNextDelay={300}
    {...props}
  />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 200,
  },
});
