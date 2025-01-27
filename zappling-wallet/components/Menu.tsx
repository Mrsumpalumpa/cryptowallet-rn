import React, { useState } from 'react';
import { Pressable, Animated, View, StyleSheet, Platform, Modal, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../models/generics';
import { useAuthContext } from '../providers/AuthProvider';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

type NavigationProp = NativeStackNavigationProp<RootStackParamsList>;

interface IProps {
    visible: boolean;
    onClose: (b: boolean) => void;
}

const Menu = ({ visible, onClose }: IProps) => {
    const [fadeAnim] = useState(new Animated.Value(0));
    const navigation = useNavigation<NavigationProp>();
    const { logoutUser,setAuth } = useAuthContext()

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: visible ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    const handleNavigation = (route: keyof RootStackParamsList) => {
      onClose(false); // Close menu first
      navigation.navigate(route);
    };

    if (!visible) return null;

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="none"
            onRequestClose={() => onClose(false)}
        >
            <Pressable 
                style={styles.modalOverlay}
                onPress={() => onClose(false)}
            >
                <Animated.View 
                    style={[
                        styles.menuContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{
                                translateY: fadeAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-20, 0],
                                }),
                            }],
                        },
                    ]}
                >
                    <Pressable style={styles.menuItem} onPress={() => handleNavigation('Profile')}>
                        <Ionicons name="home" size={20} color="#fff" />
                        <Text style={styles.text}>Home</Text>
                    </Pressable>
                    <Pressable style={styles.menuItem} onPress={() => handleNavigation('Report')}>
                        <Ionicons name="list" size={20} color="#fff" />
                        <Text style={styles.text}>Reports</Text>
                    </Pressable>
                    <Pressable style={styles.menuItem} onPress={() => handleNavigation('Snake')}>
                        <MaterialCommunityIcons name="snake" size={20} color="#fff" />
                        <Text style={styles.text}>Snake</Text>
                    </Pressable>
                    <Pressable style={styles.menuItem} onPress={() => handleNavigation('Wallet')}>
                        <AntDesign name="wallet" size={20} color="white" />
                        <Text style={styles.text}>Wallet</Text>
                    </Pressable>
                    <Pressable style={styles.menuItem} onPress={()=>{
                        setAuth(null)
                        logoutUser.refetch()
                    }}>
                        <Ionicons name="log-out-outline" size={20} color="#fff" />
                        <Text style={styles.text}>Log out</Text>
                    </Pressable>
                </Animated.View>
            </Pressable>
        </Modal>
    );
};

const FloatingMenu = () => {
    const [open, setOpen] = useState<boolean>(false);
    
    return (
        <View style={styles.main}>
            <Pressable onPress={() => setOpen((prev) => !prev)}>
                <Ionicons 
                    name={open ? "close" : "menu"} 
                    size={30} 
                    color="#6f69eb" 
                />
            </Pressable>
            <Menu visible={open} onClose={setOpen} />
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        position: 'relative',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    menuContainer: {
        position: 'absolute',
        top:  50, // Adjusted for status bar + header
        left: 10,
        backgroundColor: '#6f69eb',
        borderRadius: 8,
        padding: 8,
        width: 150, // Fixed width for menu
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    menuItem: {
      display:'flex',
      justifyContent:'flex-start',
      alignItems:'center',
      columnGap:5,
      flexDirection:'row',
      padding: 12,
      color:'#fff',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    text:{
      color:'white',
      fontSize:15
    }
});

export default FloatingMenu;