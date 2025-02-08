# Component:: [Table](Table.tsx)

The [Table](Table.tsx) component is a customizable table designed for displaying data in a React application using the Chakra UI library. It offers features such as sorting, infinite scrolling, loading indicators, and clickable rows, providing a simple and flexible solution for presenting data in a visually appealing and interactive format.

The Table component accepts the following props:

1. `items` (Array): An array of items to be displayed in the table.
2. `properties` (Array): An array of objects defining the properties of the table columns.
3. `isLoading` (Boolean, optional): Indicates whether the table is in a loading state.
4. `onFinishScroll` (Function, optional): Callback function triggered when scrolling to the bottom of the table.
5. `onChangeSorting` (Function, optional): Callback function triggered when sorting is changed.
6. `onRowClick` (Function, optional): Callback function triggered when clicking on a row.
7. `sortBy` (String, optional): Indicates the property to be sorted by.
8. `sortOrder` (String, optional): Indicates whether sorting is in (ASC OR DESC).

## Example

### Test Data

An array of test items to be displayed in the table.

```
interface Patient {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
}

const patients: Patient[] = [{
    id: 1,
    first_name: "Yurii",
    last_name: "Duda",
    email: "yuri.duda@ninetwothree.co"
}]
```

### Properties

An array of objects defining the properties of the table columns.

```
import { ITableProperty } from "@shared/components/Table";

export const TABLE_PROPERTIES: ITableProperty<Patient>[] = [
  {
    title: "First Name",
    key: "first_name",
    sortBy: "first_name", // Optional
    get: (item) => item.first_name
  },
  {
    title: "Last Name",
    key: "last_name",
    sortBy: "last_name", // Optional
    get: (item) => item.last_name
  },
  {
    title: "Email",
    key: "email",
    sortBy: "email", // Optional
    get: (item) => item.email
  }
];

```

### Example of use

```
export interface IFilter {
  page: number;
  limit: number;
  sort_by?: string;
  sort_order?: ORDER_TYPE;
}
```

```
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Table } from "@shared/components";
import { useSelector, useDispatch } from "react-redux";
import { actions, selectors } from "@containers/Patient/store";

const PatientListContainer = () => {
  const dispatch = useDispatch();

  const patients = useSelector(selectors.getPatients());
  const patientsTotal = useSelector(selectors.getPatientsTotal());
  const filter = useSelector(selectors.getFilter());

  const { isLoading } = useLoader({
    name: "PatientsList",
    actionTypes: useMemo(() => [actions.getPatients], []),
  });

  const changeFilter = useCallback(
    (updatedFilter: Partial<PatientFilter>) => {
      dispatch(
        actions.updateFilter({
          ...updatedFilter,
          page: 0,
        }),
      );
    },
    [dispatch],
  );

  const handleChangeSorting = useCallback(
    (field: string | undefined, order: ORDER_TYPE) => {
      changeFilter(
          sort_by: field,
          sort_order: order,
      );
    },
    [changeFilter],
  );

  const handleLoadNextPage = useCallback(() => {
    if (filter.limit * (filter.page + 1) < patientsTotal) {
      dispatch(
        actions.setFilter({
          ...filter,
          page: filter.page + 1,
        }),
      );
    }
  }, [dispatch, filter, patientsTotal]);


  const handleRowClick = useCallback(
    (item?: Patient) => {},
    [],
  );

  return (
      <Table
          isLoading={isLoading}
          items={patients}
          properties={TABLE_PROPERTIES}
          onRowClick={openPatientDetails}
          onFinishScroll={handleLoadNextPage}
          onChangeSorting={handleChangeSorting}
          sortBy={filter.sort_by}
          sortOrder={filter.sort_order}
      />
  );
};

export default PatientListContainer;

```
