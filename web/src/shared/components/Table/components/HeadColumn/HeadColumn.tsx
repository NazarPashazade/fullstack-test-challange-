import React, { useCallback, useMemo } from "react";
import { Box, Flex, Icon, Th } from "@chakra-ui/react";

import { ITableProperty, ITableSort } from "../../interfaces";

import { ArrowDownIcon } from "@shared/components/Icons/ArrowDownIcon";
import { ArrowUpIcon } from "@shared/components/Icons/ArrowUpIcon";
import { ORDER_TYPE } from "@shared/interfaces";

export interface HeadColumnProps<T> extends ITableSort {
  property: ITableProperty<T>;
}

function HeadColumn<T>(props: HeadColumnProps<T>) {
  const { property, onChangeSorting } = props;

  const isSortingColumn = useMemo(() => property.sortBy === props.sortBy, [property.sortBy, props.sortBy]);

  const handleChangeSorting = useCallback(
    (sortOrder: ORDER_TYPE) => {
      if (onChangeSorting) {
        if (property.sortBy === props.sortBy && props.sortOrder === sortOrder) {
          onChangeSorting(undefined, undefined);
          return;
        }

        onChangeSorting(property.sortBy, sortOrder);
      }
    },
    [onChangeSorting, property.sortBy, props.sortBy, props.sortOrder],
  );

  return (
    <Th>
      <Flex alignItems="center">
        <Box fontSize="10px" fontWeight="700">
          {property.title}
        </Box>
        {property.sortBy ? (
          <Flex w="4px" alignItems="center" ml="6px" cursor="pointer" flexDir="column">
            <Icon
              cursor="pointer"
              fill={isSortingColumn && property.sortBy === ORDER_TYPE.ASC ? "successColor" : "headerThTableColor"}
              onClick={() => handleChangeSorting(ORDER_TYPE.ASC)}
              as={ArrowUpIcon}
              fontSize="8px"
            />
            <Icon
              cursor="pointer"
              fill={isSortingColumn && property.sortBy === ORDER_TYPE.DESC ? "successColor" : "headerThTableColor"}
              fontSize="8px"
              onClick={() => handleChangeSorting(ORDER_TYPE.DESC)}
              as={ArrowDownIcon}
            />
          </Flex>
        ) : null}
      </Flex>
    </Th>
  );
}

export default HeadColumn;
