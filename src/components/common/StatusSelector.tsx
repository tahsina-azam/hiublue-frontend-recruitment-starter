import { Box, Button } from "@mui/material";

interface StatusSelectorProps {
  selectedStatus: "all" | "accepted";
  onStatusChange: (status: "all" | "accepted") => void;
}

const StatusSelector: React.FC<StatusSelectorProps> = ({ selectedStatus, onStatusChange }) => {
  const statuses: { label: string; value: "all" | "accepted" }[] = [
    { label: "All", value: "all" },
    { label: "Accepted", value: "accepted" },
  ];

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {statuses.map(({ label, value }) => (
        <Button
          key={value}
          onClick={() => onStatusChange(value)}
          sx={{
            position: "relative",
            color: selectedStatus === value ? "#000" : "#666",
            fontWeight: selectedStatus === value ? "bold" : "normal",
            minWidth: "auto",
            "&::after": {
              content: '""',
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              height: "2px",
              backgroundColor: selectedStatus === value ? "black" : "transparent",
            },
          }}
        >
          {label}
        </Button>
      ))}
    </Box>
  );
};

export default StatusSelector;
