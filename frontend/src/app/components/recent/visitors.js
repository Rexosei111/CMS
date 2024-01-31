"use client";
import {
  Divider,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { TextInputField } from "../inputs";
import { SearchOutlined } from "@mui/icons-material";

const columns = [
  // { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name of client", width: 220 },
  { field: "gender", headerName: "Gender", width: 100 },
  { field: "location", headerName: "Location", width: 170 },
  { field: "purpose", headerName: "Purpose of visit", width: 200 },
  { field: "timeIn", headerName: "Time in", width: 150, type: "date" },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];

const rows = [
  {
    id: 1,
    name: "John Doe",
    gender: "Male",
    location: "New York",
    purpose: "Business",
    timeIn: new Date(),
  },
  {
    id: 2,
    name: "Jane Smith",
    gender: "Female",
    location: "Los Angeles",
    purpose: "Vacation",
    timeIn: new Date(),
  },
  {
    id: 3,
    name: "Sam Johnson",
    gender: "Male",
    location: "Chicago",
    purpose: "Conference",
    timeIn: new Date(),
  },
  {
    id: 4,
    name: "Emily White",
    gender: "Female",
    location: "San Francisco",
    purpose: "Meeting",
    timeIn: new Date(),
  },
  {
    id: 5,
    name: "Alex Brown",
    gender: "Non-binary",
    location: "Seattle",
    purpose: "Training",
    timeIn: new Date(),
  },
  {
    id: 6,
    name: "Chris Miller",
    gender: "Male",
    location: "Miami",
    purpose: "Vacation",
  },
  {
    id: 7,
    name: "Mia Davis",
    gender: "Female",
    location: "Denver",
    purpose: "Business",
  },
  {
    id: 8,
    name: "Jordan Taylor",
    gender: "Non-binary",
    location: "Austin",
    purpose: "Meeting",
  },
  {
    id: 9,
    name: "Ryan Lee",
    gender: "Male",
    location: "Atlanta",
    purpose: "Conference",
  },
  {
    id: 10,
    name: "Sara Johnson",
    gender: "Female",
    location: "Boston",
    purpose: "Training",
    timeIn: new Date(),
  },
  {
    id: 11,
    name: "Max Smith",
    gender: "Male",
    location: "Portland",
    purpose: "Business",
    timeIn: new Date(),
  },
  {
    id: 12,
    name: "Avery White",
    gender: "Non-binary",
    location: "Houston",
    purpose: "Vacation",
  },
  {
    id: 13,
    name: "Taylor Martin",
    gender: "Female",
    location: "Detroit",
    purpose: "Meeting",
  },
  {
    id: 14,
    name: "Jordan Clark",
    gender: "Male",
    location: "Phoenix",
    purpose: "Conference",
  },
  {
    id: 15,
    name: "Jamie Brown",
    gender: "Non-binary",
    location: "Raleigh",
    purpose: "Training",
  },
];

const VisitorsDataGrid = () => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // initialState={{
        //   pagination: {
        //     paginationModel: { page: 0, pageSize: 5 },
        //   },
        // }}
        // pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export const RecentVisitors = () => {
  const visitors = [
    {
      name: "Test client",
      contacts: "0123456779, testemail@gmail.com",
      timeIn: new Date().toISOString(),
    },
    {
      name: "Test client 2",
      contacts: "0123456779, testemail2@gmail.com",
      timeIn: new Date().toISOString(),
    },
    {
      name: "Test client 3",
      contacts: "0123456779, testemail3@gmail.com",
      timeIn: new Date().toISOString(),
    },
    {
      name: "Test client 4",
      contacts: "0123456779, testemail4@gmail.com",
      timeIn: new Date().toISOString(),
    },
    {
      name: "Test client 5",
      contacts: "0123456779, testemail5@gmail.com",
      timeIn: new Date().toISOString(),
    },
    {
      name: "Test client 6",
      contacts: "0123456779, testemail6@gmail.com",
      timeIn: new Date().toISOString(),
    },
    {
      name: "Test client 7",
      contacts: "0123456779, testemail7@gmail.com",
      timeIn: new Date().toISOString(),
    },
  ];
  return (
    <Stack width={"100%"} flexDirection={"column"} gap={2} mt={3}>
      {/* <Typography variant="body2" fontSize={24}>
        Recent Visitors
      </Typography> */}
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <TextInputField
          // label="With normal TextField"
          size="small"
          id="outlined-start-adornment"
          placeholder="Search by client name"
          // sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined fontSize="small" />
              </InputAdornment>
            ),
            style: { fontSize: 13 },
          }}
        />
      </Stack>
      <VisitorsDataGrid />
    </Stack>
  );
};
