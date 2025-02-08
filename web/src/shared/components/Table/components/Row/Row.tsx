import React, { useCallback } from "react";
import { Tr, Td, Box } from "@chakra-ui/react";

import { ITableProperty } from "../../interfaces";

export interface RowProps<T> {
  item: T;
  properties: ITableProperty<T>[];
  onClick?: () => void;
}

function getItemCellContent<T>(item: T, prop: ITableProperty<T>) {
  return prop.get ? prop.get(item) : item[prop.key];
}

function Row<T>(props: RowProps<T>) {
  const { properties, item, onClick } = props;

  const localCellClick = useCallback(
    (property: ITableProperty<T>, event: React.MouseEvent) => {
      if (!property.cellClick) {
        return;
      }

      event.stopPropagation();
      event.preventDefault();

      property.cellClick(item);
    },
    [item],
  );

  return (
    <Tr onClick={onClick} cursor="pointer">
      {properties.map((prop, index) => (
        <Td key={index}>
          <>
            {getItemCellContent<T>(item, prop)}
            <Box onClick={(e) => localCellClick(prop, e)}></Box>
          </>
        </Td>
      ))}
    </Tr>
  );
}

export default Row;
