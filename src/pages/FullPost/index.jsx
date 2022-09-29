import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const FullPost = () => {
  const { id } = useParams();

  
  return (
    <Container>
      <img src="/" alt="img" />
      <Typography>Title</Typography>
      <Typography>description</Typography>
      <Typography>Price</Typography>
    </Container>
  );
};

export default FullPost;
