import { Box, Button, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomTable from '../components/CustomTable';
import { FirestoreService } from '../apis/serviceBase';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function CategoryPage() {
  const columns = [
    { key: 'icon', header: 'Icon', sortTable: true },
    { key: 'name', header: 'Name', sortTable: true },
    { key: 'budget', header: 'Budget', sortTable: true },
    { key: 'type', header: 'Type', sortTable: true },
  ];
  const categoryService = new FirestoreService(db, 'groups');
  const userService = new FirestoreService(db, 'users');
  const [data, setData] = useState<any[]>([]);
  const { user } = useSelector((state: RootState) => state.user);
  const fetchData = async () => {
    if (!user?.email) {
      return;
    }
    const x = await userService.getDoc(user.email);
    const result = await categoryService.getSubCollectionDocs(x.data.groups[0], 'categories');

    if (result.success && result.data) {
      setData(result.data.docs);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Category (20)
        </Typography>
        <Button variant="contained" color="success">
          + Add Category
        </Button>
      </Box>
      <Paper elevation={2}>
        <CustomTable columns={columns} data={data} selectable searchable />
      </Paper>
    </Box>
  );
}
