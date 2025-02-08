import React from "react";
import { Thead, Tr } from "@chakra-ui/react";

import { HeadColumn } from "../HeadColumn";
import { ITableProperty, ITableSort } from "../../interfaces";

export interface HeadProps<T> extends ITableSort {
  properties: ITableProperty<T>[];
}

function Head<T>(props: HeadProps<T>) {
  const { properties, sortBy, onChangeSorting, sortOrder } = props;

  return (
    <Thead position="sticky" top="-1px" bg="white">
      <Tr>
        {properties.map((prop) => (
          <HeadColumn
            key={prop.title}
            property={prop}
            sortBy={sortBy}
            onChangeSorting={onChangeSorting}
            sortOrder={sortOrder}
          />
        ))}
      </Tr>
    </Thead>
  );
}

export default Head;
