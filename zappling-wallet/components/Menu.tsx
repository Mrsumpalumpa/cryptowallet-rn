import React, { useState } from 'react';
import { Pressable, Animated, View, StyleSheet, Platform, Modal, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../models/generics';

type NavigationProp = NativeStackNavigationProp<RootStackParamsList>;

interface IProps {
    visible: boolean;
    onClose: (b: boolean) => void;
}

const Menu = ({ visible, onClose }: IProps) => {
    const [fadeAnim] = useState(new Animated.Value(0));
    const navigation = useNavigation<NavigationProp>();

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
                        <Ionicons name="person-outline" size={20} color="#fff" />
                    </Pressable>
                    <Pressable style={styles.menuItem} onPress={() => handleNavigation('Report')}>
                        <Ionicons name="settings-outline" size={20} color="#fff" />
                    </Pressable>
                    <Pressable style={styles.menuItem} onPress={() => handleNavigation('Login')}>
                        <Ionicons name="log-out-outline" size={20} color="#fff" />
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
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
});

export default FloatingMenu;