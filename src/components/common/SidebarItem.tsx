import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Image from 'next/image';

interface SidebarItemProps {
  text: string;
  icon?: string | null;
}

export default function SidebarItem({ text, icon }: SidebarItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        {icon && (
          <ListItemIcon>
            <Image src={icon} alt={`${text} Icon`} width={36} height={24} />
          </ListItemIcon>
        )}
        <ListItemText
          primary={text}
          sx={{ color: '#637381', fontSize: '13px' }}
        />
      </ListItemButton>
    </ListItem>
  );
}
