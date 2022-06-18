import React, { useEffect, useState } from "react";

import { DrawerLayoutAndroidComponent, FlatList } from "react-native";
import { VictoryPie, VictoryTooltip } from "victory-native";

import { Card, CardProps } from "../components/Card";
import { Header, MonthsProps } from "../components/Header";
import { EXPENSES } from "../utils/expenses";

import { ChartContainer, Container } from "./styles";

export function Home() {
  const [month, setMonth] = useState<MonthsProps>("Janeiro");
  const [data, setData] = useState<CardProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCardPress = (id: string) => {
    setSelectedCategory((prev) => (prev === id ? "" : id));
  };

  useEffect(() => {
    setData(EXPENSES[month]);
  }, [month]);

  return (
    <Container>
      <Header onValueChange={setMonth} selectedValue={month} />

      <ChartContainer>
        <VictoryPie
          data={data}
          x="label"
          y="value"
          colorScale={data.map((expense) => expense.color)}
          innerRadius={90}
          animate={{
            duration: 1000,
            easing: "bounce",
          }}
          padAngle={1}
          style={{
            labels: {
              fill: "#fff",
            },
            data: {
              fillOpacity: ({ datum }) =>
                datum.id === selectedCategory || selectedCategory === ""
                  ? 1
                  : 0.28,
              stroke: ({ datum }) =>
                datum.id === selectedCategory ? datum.color : "none",
              strokeOpacity: 0.65,
              strokeWidth: 6,
            },
          }}
          labelComponent={
            <VictoryTooltip
              renderInPortal
              flyoutStyle={{
                stroke: 0,
                fill: ({ datum }) => datum.color,
              }}
            />
          }
        />
      </ChartContainer>

      <FlatList
        data={EXPENSES[month]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            data={item}
            selected={false}
            onPress={() => handleCardPress(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
