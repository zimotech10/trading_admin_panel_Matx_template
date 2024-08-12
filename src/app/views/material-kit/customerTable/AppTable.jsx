import { Box, styled } from '@mui/material';
import CustomerTable from './CustomerTable';
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
                    routeSegments={[{ name: 'CustomerTable', path: '/material/customerTable' }]}
                />
            </Box>

            {/* <SimpleCard title="Simple Table">
        <SimpleTable />
      </SimpleCard> */}

            <SimpleCard title="Customers Table" sx={{ display: 'flex' }}>
                <CustomerTable />
            </SimpleCard>
        </Container>
    );
}
