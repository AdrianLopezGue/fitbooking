import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  BoxProps,
  Button,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import {
  IoIosFitness,
  IoIosCalendar,
  IoIosSettings,
  IoIosBusiness,
  IoIosMenu,
  IoIosArrowDown,
} from 'react-icons/io';

const getLinkItems = (boxId: string, role: string) => {
  const defaultOptions = [
    { name: 'Calendar', icon: IoIosCalendar, href: `/${boxId}/calendar` },
    { name: 'Sessions', icon: IoIosFitness, href: `/${boxId}/sessions` },
    { name: 'Boxes', icon: IoIosBusiness, href: `/boxes` },
  ];

  return role === 'ADMIN'
    ? [
        ...defaultOptions,
        { name: 'Athletes', icon: IoIosSettings, href: `/${boxId}/athletes` },
      ]
    : defaultOptions;
};

export function SidebarWithHeader({
  children,
  boxId,
  boxName,
  userName,
  role,
}: {
  children: ReactNode;
  boxId: string;
  boxName: string;
  userName: string;
  role: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        boxName={boxName}
        boxId={boxId}
        role={role}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} boxName={boxName} boxId={boxId} role={role} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} userName={userName} role={role} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProperties extends BoxProps {
  onClose: () => void;
  boxId: string;
  boxName: string;
  role: string;
}

const SidebarContent = ({
  onClose,
  boxId,
  boxName,
  role,
  ...rest
}: SidebarProperties) => {
  const linkItems = getLinkItems(boxId, role);
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" mb="8" justifyContent="space-between">
        <Flex flexDirection={'column'}>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color={useColorModeValue('teal', 'white')}
          >
            Fitbooking
          </Text>
          <Text fontSize="small">{boxName}</Text>
        </Flex>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {linkItems.map(link => (
        <NavItem href={link.href} key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProperties extends FlexProps {
  icon: IconType;
  href: string;
  children: ReactNode;
}
const NavItem = ({ icon, href, children, ...rest }: NavItemProperties) => {
  return (
    <Link href={href} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'teal',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="24"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProperties extends FlexProps {
  onOpen: () => void;
  userName: string;
  role: string;
}
const MobileNav = ({ onOpen, userName, role, ...rest }: MobileProperties) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<IoIosMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontWeight="bold"
        color={useColorModeValue('teal', 'white')}
      >
        Fitbooking
      </Text>

      <HStack spacing={{ base: '0', md: '2' }}>
        <Button variant="ghost" size="lg" onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{userName}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {role}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <IoIosArrowDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
