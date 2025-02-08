import React, { useCallback } from "react";
import { Box, Spinner, Table as ChakraTable, TableContainer, Tbody } from "@chakra-ui/react";

import { ITableProperty, ITableSort } from "./interfaces";
import { Head } from "./components/Head";
import { Row } from "./components/Row";

import { useDebouncedFunction } from "@shared/hooks";

export interface TableProps<T> extends ITableSort {
  items: T[];
  properties: ITableProperty<T>[];
  isLoading?: boolean;
  onFinishScroll?: () => void;
  onChangeSorting?: () => void;
  onRowClick?: (item: T) => void;
}

function Table<T>(props: TableProps<T>) {
  const { items, properties, onFinishScroll, onRowClick, isLoading, sortBy, onChangeSorting, sortOrder } = props;

  const debouncedFinishScroll = useDebouncedFunction(onFinishScroll);

  const onScroll = useCallback(
    (event: React.SyntheticEvent<Element>) => {
      const maxScroll = event.currentTarget.scrollHeight - event.currentTarget.clientHeight;
      if (event.currentTarget.scrollTop >= maxScroll - 1 && debouncedFinishScroll) {
        debouncedFinishScroll();
      }
    },
    [debouncedFinishScroll],
  );

  return (
    <Box>
      <TableContainer onScroll={onScroll}>
        <ChakraTable variant="striped">
          <Head<T> properties={properties} sortBy={sortBy} sortOrder={sortOrder} onChangeSorting={onChangeSorting} />
          <Tbody>
            {items.map((item, index) => (
              <Row<T> key={index} item={item} properties={properties} onClick={() => onRowClick?.(item)} />
            ))}
          </Tbody>
        </ChakraTable>
        {isLoading ? (
          <Spinner
            position="absolute"
            top="calc(50% - 24px)"
            left="calc(50% - 24px)"
            thickness="4px"
            speed="2.2s"
            emptyColor="gray.200"
            color="secondary"
            size="xl"
          />
        ) : null}
      </TableContainer>
    </Box>
  );
}

export default Table;
