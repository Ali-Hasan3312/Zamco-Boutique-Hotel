import React from 'react';
import { XAxis, YAxis } from 'recharts';
import { AxisDomain } from 'recharts/types/util/types';

type CustomXAxisProps = React.ComponentProps<typeof XAxis>;
type CustomYAxisProps = React.ComponentProps<typeof YAxis>;

export const CustomXAxis: React.FC<CustomXAxisProps> = ({ 
  tickFormatter = (value: AxisDomain) => `${value}`, 
  ...props 
}) => (
  <XAxis tickFormatter={tickFormatter} {...props} />
);

export const CustomYAxis: React.FC<CustomYAxisProps> = ({ 
  tickFormatter = (value: AxisDomain) => `${value}`, 
  ...props 
}) => (
  <YAxis tickFormatter={tickFormatter} {...props} />
);