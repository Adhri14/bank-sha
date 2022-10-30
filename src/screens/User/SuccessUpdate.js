import React from 'react';
import { Button, Gap, Scaffold, Text } from '../../components';
import { Container } from '../../styled';
import StaticColor from '../../utils/Colors';

const SuccessUpdate = ({ navigation }) => {
    return (
        <Scaffold
            useSafeArea
            showHeader={false}
            isLeftButton={false}
            scrollEnabled={false}
        >
            <Container
                flex={1}
                justify="center"
                align="center"
                marginHorizontal={60}
            >
                <Text type="semibold" size={20}>
                    Nice Update!
                </Text>
                <Gap height={26} />
                <Text
                    size={16}
                    type="regular"
                    color={StaticColor.subtitleColor}
                >
                    {'Your data is safe with\nour system'}
                </Text>
                <Gap height={50} />
                <Button
                    onPress={() =>
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'MainApp' }],
                        })
                    }
                >
                    My Profile
                </Button>
            </Container>
        </Scaffold>
    );
};

export default SuccessUpdate;
