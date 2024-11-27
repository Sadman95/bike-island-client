import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

export default function CustomList({ title = '', data, selectable = false }) {
  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'lightgrey',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        borderRadius: 2,
        my: 4,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {title && (
        <ListSubheader
          sx={{
            backgroundColor: 'lightslategrey',
            color: 'white',
          }}
        >{`${title}`}</ListSubheader>
      )}
      {data.map((item) => (
        <ListItem key={`item-${item}`} sx={{
          cursor: selectable && 'pointer',
          '&:hover': {
            backgroundColor: 'InfoBackground'
          }
        }}>
          <ListItemText
            primary={`${item}`}
            sx={{
              textAlign: 'center',
            }}
          />
        </ListItem>
      ))}
    </List>
  );
}
