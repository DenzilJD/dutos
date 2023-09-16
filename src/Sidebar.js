import React from "react";
import { Box, CloseButton, Flex, Icon, useColorModeValue, Text, Drawer, useDisclosure } from "@chakra-ui/react";
import { FiHome, FiPlus, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LinkItems = [
  { name: "Dashboard", icon: FiHome, link: './dashboard' },
  // { name: "Place Order", icon: FiList, link: './order' },
  { name: "Add Product", icon: FiPlus, link: './product' },
  { name: "Add Category", icon: FiPlus, link: './category' }
]

export const Sidebar = () => {
  const { isOpen, onClose } = useDisclosure()
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
      </Drawer>
      <Box ml={{ base: 0, md: 60 }}>
        {/* Content */}
      </Box>
    </Box>
  )
}

const SidebarContent = ({ onClose, ...rest }) => {
  const navigate = useNavigate();
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Inventory
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem key={link.name} link={link.link} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
      <NavItem onClick={() => {
        localStorage.removeItem("userInfo");
        navigate('/');
      }}
        icon={FiLogOut}
      >
        <Text color='red'>Log Out</Text>
      </NavItem>
    </Box >
  )
}

const NavItem = ({ link, icon, children, ...rest }) => {
  return (
    <Box
      as="a"
      href={link}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white"
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white"
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}