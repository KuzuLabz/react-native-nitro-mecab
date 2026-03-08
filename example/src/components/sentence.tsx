import { Pressable, Text, View } from "react-native";

const TextButton = ({onPress, isSelected, color, children}:{onPress: () => void; isSelected: boolean; color?: string; children: string}) => {
    return(
        <Pressable onPress={onPress} style={{backgroundColor: color, padding: 6, borderRadius:  8, borderWidth: 4, borderColor: isSelected ? '#004cff': "transparent"}}>
            <Text style={{fontSize: 18}}>{children}</Text>
        </Pressable>
    );
};

type SentenceSelectorProps = {
    surfaces: string[];
    colors: string[];
    currentIdx: number;
    onPress: (idx: number) => void;
};
export const SentenceSelector = ({ surfaces, colors, currentIdx, onPress }: SentenceSelectorProps) => {
    if (surfaces.length < 1) {
        return;
    }
    return(
        <View style={{flexDirection: 'row', flexWrap: 'wrap', padding: 12, gap: 6}}>
            {surfaces.map((surface, idx) => (
                <TextButton key={idx} isSelected={idx === currentIdx} color={colors[idx] ?? undefined} onPress={() => onPress(idx)}>{surface}</TextButton>
            ))}
        </View>
    );
};