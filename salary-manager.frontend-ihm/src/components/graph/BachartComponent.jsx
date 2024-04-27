// BarChartComponent.js
import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", uv: 400, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 300, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 200, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 278, pv: 3908, amt: 2000 },
  { name: "May", uv: 189, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 239, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 349, pv: 4300, amt: 2100 },
  { name: "Aug", uv: 239, pv: 3800, amt: 2500 },
  { name: "Sep", uv: 349, pv: 4300, amt: 2100 },
  { name: "Oct", uv: 239, pv: 3800, amt: 2500 },
  { name: "Nov", uv: 349, pv: 4300, amt: 2100 },
  { name: "Dec", uv: 349, pv: 4300, amt: 2100 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        bg="white"
        border="1px solid"
        borderColor="gray.200"
        p={3}
        borderRadius={8}
      >
        <Text fontSize="sm">Month: {label}</Text>
        <Text fontSize="sm">Value: {payload[0].value}</Text>
      </Box>
    );
  }
  return null;
};

const BarChartComponent = () => {
  return (
    <Flex justify="center">
      <Box p={8} bg="white" boxShadow="md" borderRadius={8}>
        <Text fontSize="xl" mb={4}>
          Statisique
        </Text>
        <BarChart width={600} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      </Box>
    </Flex>
  );
};

export default BarChartComponent;
