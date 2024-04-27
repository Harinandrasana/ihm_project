// PieChartComponent.js
import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { PieChart, Pie, Tooltip, Legend } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <Box
        bg="white"
        border="1px solid"
        borderColor="gray.200"
        p={3}
        borderRadius={8}
      >
        <Text fontSize="sm">{`${name} : ${value}`}</Text>
      </Box>
    );
  }
  return null;
};

const PieChartComponent = () => {
  return (
    <Flex align="center" justify="center">
      <Box bg="white" boxShadow="md" borderRadius={8}>
        <Text fontSize="xl" mb={4}>
          Pie Chart
        </Text>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip content={<CustomTooltip />} />
          {/* <Legend /> */}
        </PieChart>
      </Box>
    </Flex>
  );
};

export default PieChartComponent;
