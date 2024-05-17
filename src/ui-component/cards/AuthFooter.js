import { Link, Typography, Stack } from '@mui/material';

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://odhiambo-george.vercel.app/" target="_blank" underline="hover">
      george.io
    </Typography>
    <Typography variant="subtitle2" component={Link} href="https://odhiambo-george.vercel.app/" target="_blank" underline="hover">
      &copy; odhiambo.george
    </Typography>
  </Stack>
);

export default AuthFooter;
