import { ReactNode } from "react";
import { Text, View } from "react-native";

type ContainerProps = {
    title: string;
    children: ReactNode | ReactNode[];
};
export const Container = ({ title, children}: ContainerProps) => {
    return(
        <View style={{borderRadius: 12, borderWidth: 1, padding: 12, gap: 8}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{title}</Text>
            {children}
        </View>
    );
};