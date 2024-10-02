import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from '../../styles/normaDetalleStyles';

const RenderApbField = ({ value, description, practicaapb, pagaporfaba, valoracreditadosapb, tipoapb }) => {
    const isValueValid = (value) => value !== undefined && value !== null && value !== 0 && (typeof value !== 'string' || value.trim());

    const renderIcon = () => {
        if (typeof value === 'string') {
            if (value.toUpperCase() === 'SI') {
                return <AntDesign name="checkcircleo" size = { 25} color = "green" />;
            } else if (value.toUpperCase() === 'NO') {
                return <AntDesign name="closecircleo" size = { 25} color = "red" />;
            }
        }
        return null;
    };

    return (
        <View style= { styles.contenedorConLinea } >
        <View style={ styles.apbHeader }>
            <Text style={ styles.titulo }> APB: </Text>
                < View style = { styles.iconContainer } >
                    { renderIcon() }
                    </View>
                    </View>

                    < Text style = { styles.itemObservaciones } > { description } </Text>

                        < View style = { styles.rowAPB } >
                            { isValueValid(tipoapb) && (
                                <View style={ styles.column }>
                                    <Text style={ styles.itemTitle }> Tipo{ '\n' } APB: </Text>
                                        < Text style = { styles.informacion } > { tipoapb } </Text>
                                            </View>
        )}
{
    isValueValid(pagaporfaba) && (
        <View style={ styles.column }>
            <Text style={ styles.itemTitle }> Factura{ '\n' }por FABA: </Text>
                < Text style = { styles.informacion } > { pagaporfaba } </Text>
                    </View>
        )
}
{
    isValueValid(practicaapb) && (
        <View style={ styles.column }>
            <Text style={ styles.itemTitle }> Práctica: { '\n' } </Text>
                < Text style = { styles.informacion } > { practicaapb } </Text>
                    </View>
        )
}
{
    isValueValid(valoracreditadosapb) && (
        <View style={ styles.column }>
            <Text style={ styles.itemTitle }> Valor: { '\n' } </Text>
                < Text style = { styles.informacion } > $ { valoracreditadosapb } </Text>
                    </View>
        )
}
</View>
    </View>
  );
};

export default RenderApbField;
