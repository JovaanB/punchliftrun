import { Button, Text } from "react-native-paper";
import { logout } from "../utils/auth";
import Layout from "../components/Layout";
import ScreenTitle from "../components/ScreenTitle";


const SettingsScreen = () => {
    return (
        <Layout>
            <ScreenTitle title="Mon compte" />
            <Button onPress={logout}>Se déconnecter</Button>
        </Layout>
    );
};

export default SettingsScreen;
