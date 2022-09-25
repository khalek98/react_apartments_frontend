import React from 'react';
import { Card, CardContent, Skeleton } from '@mui/material';

const SkeletonItem = () => {
  return (
    <Card
      sx={{
        overflow: 'unset',
        position: 'relative',
        borderRadius: '15px',
      }}
    >
      <Skeleton
        sx={{ height: 280, borderRadius: '15px 15px 0 0' }}
        animation="wave"
        variant="rectangular"
      />
      <CardContent sx={{ height: 150 }}>
        <Skeleton animation="wave" height={40} />
        <Skeleton animation="wave" height={30} width="80%" />
        <Skeleton
          animation="wave"
          height={40}
          width="40%"
          style={{ position: 'absolute', bottom: '10px', left: '15px' }}
        />
      </CardContent>
    </Card>
  );
};

export default SkeletonItem;
