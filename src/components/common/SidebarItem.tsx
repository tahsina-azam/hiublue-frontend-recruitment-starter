import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

interface SidebarItemProps {
  text: string;
  icon?: string | null;
  link?: string;
}

export default function SidebarItem({ text, icon, link }: SidebarItemProps) {
  return (
    <ListItem disablePadding>
      <Link href={link} passHref style={{ textDecoration: 'none' }}>
        {' '}
        {/* Link component for routing */}
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
      </Link>
    </ListItem>
  );
}
