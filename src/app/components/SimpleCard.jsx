import { Card, Box, styled } from "@mui/material";

// STYLED COMPONENTS
const CardRoot = styled(Card)({
  height: "100%",
  padding: "20px 24px",
  overflow: "auto", // Add overflow to make the content scrollable if it exceeds the height
  display: "flex",
  flexDirection: "column" // Ensure children layout correctly
});

const CardTitle = styled("div")(({ subtitle }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
  marginBottom: !subtitle ? "16px" : "8px" // Adjust margin based on presence of subtitle
}));

export default function SimpleCard({ children, title, subtitle }) {
  return (
    <CardRoot elevation={6}>
      <CardTitle subtitle={subtitle}>{title}</CardTitle>
      {subtitle && <Box mb={2}>{subtitle}</Box>}
      <Box sx={{ flexGrow: 1 }}> {/* Ensure children take available space */}
        {children}
      </Box>
    </CardRoot>
  );
}
