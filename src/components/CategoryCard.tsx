import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Chip,
  Box,
  IconButton,
} from '@mui/material';
import { TrendingUp, TrendingDown, Delete, Edit } from '@mui/icons-material';
import { CategoryCardProps } from '../types/category';

export default function CategoryCard({ category, onDelete, onUpdate }: CategoryCardProps) {
  const { icon, name, budget, type, spent } = category;
  const isExpense = type === 'expense';

  return (
    <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3, p: 1 }}>
      <CardHeader
        avatar={<Typography variant="h4">{icon}</Typography>}
        title={
          <Typography variant="h6" fontWeight="bold">
            {name}
          </Typography>
        }
        action={
          <Chip
            icon={isExpense ? <TrendingDown fontSize="small" /> : <TrendingUp fontSize="small" />}
            label={type}
            color={isExpense ? 'error' : 'success'}
            size="small"
          />
        }
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body2" color="text.secondary">
            Budget
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            ${budget.toLocaleString()}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body2" color="text.secondary">
            Spent
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            ${spent.toLocaleString()}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          borderTop={1}
          borderColor="divider"
          pt={1}
        >
          <Typography variant="body2" color="text.secondary">
            Remaining
          </Typography>
          <Typography
            variant="body2"
            fontWeight="bold"
            color={isExpense && spent > budget ? 'error.main' : 'success.main'}
          >
            ${Math.max(budget - spent, 0).toLocaleString()}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <IconButton color="primary" onClick={() => onUpdate(category)}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={() => onDelete(category)}>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
}
