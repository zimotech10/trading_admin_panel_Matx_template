import { Box, styled } from '@mui/material';
// import SimpleTable from './SimpleTable';
import PlansTable from './PlansTable';
import { Breadcrumb, SimpleCard } from 'app/components';

// STYLED COMPONENTS
const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
    }
}));

export default function AppTable() {
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[{ name: 'PlansTable', path: '/material/plansTable' }]}
                />
            </Box>

            {/* <SimpleCard title="Simple Table">
        <SimpleTable />
      </SimpleCard> */}

            <SimpleCard title="Plan Table">
                <PlansTable />
            </SimpleCard>
        </Container>
    );
}
