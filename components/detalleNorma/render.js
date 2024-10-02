import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from '../../styles/normaDetalleStyles';

const RenderField = (
    { label, value, isCollapsible = false, collapsed = true, onToggle = () => { }, showLabel = true }
) => {
    const isValueValid = (value) => value !== undefined && value !== null && value !== 0 && (typeof value !== 'string' || value.trim());

    const renderValue = () => {
        if (typeof value === 'string') {
            if (value.toUpperCase() === 'SI') {
                return <AntDesign name="checkcircleo" size={25} color="green" />;
            } else if (value.toUpperCase() === 'NO') {
                return <AntDesign name="closecircleo" size={25} color="red" />;
            }
            return <Text>{value}</Text>;
        }

        if (Array.isArray(value)) {
            const expectedOrders = ['Orden Digital', 'Orden Electrónica', 'Orden Pre-impresa', 'Orden Grillada'];
            const foundOrders = value.map(item => item.tipo);
            const missingOrders = expectedOrders.filter(order => !foundOrders.includes(order));

            const allOrdersHaveSpecialValue = value.every(item => item.opcion === 'Consultar en Normas de Obras Sociales de la WEB de FABA');

            if (allOrdersHaveSpecialValue) {
                return (
                    <View style={styles.itemFormatoOrdenes}>
                        <Text style={styles.consultaNorma}>
                            Consultar en Normas de Obras Sociales de la web de FABA
                        </Text>
                    </View>
                );
            }

            return (
                <>
                    {value.map((item, index) => {
                        const isSpecialCase = item.opcion === 'Enviar copia de la orden a Atención al Bioquímico';
                        return (
                            <View key={index} style={styles.itemFormatoOrdenes}>
                                <View style={styles.itemFormatoOrdenesTituloYAcepta}>
                                    <Text style={styles.itemTitle}>{item.tipo}:</Text>
                                    {isSpecialCase ? (
                                        <AntDesign name="infocirlceo" size={25} color="#F2C403" />
                                    ) : (
                                        typeof item.opcion === 'string' && item.opcion.toUpperCase() === 'SÍ' ? (
                                            <AntDesign name="checkcircleo" size={25} color="green" />
                                        ) : typeof item.opcion === 'string' && item.opcion.toUpperCase() === 'NO' ? (
                                            <AntDesign name="closecircleo" size={25} color="red" />
                                        ) : (
                                            <Text style={styles.itemText}>{item.opcion}</Text>
                                        )
                                    )}
                                </View>
                                <Text style={styles.itemObservaciones}>
                                    {isSpecialCase ? `Enviar copia de la orden a Atención al Bioquímico` : item.texto}
                                </Text>
                            </View>
                        );
                    })}
                    {missingOrders.map((order, index) => (
                        <View key={index} style={styles.itemFormatoOrdenes}>
                            <View style={styles.itemFormatoOrdenesTituloYAcepta}>
                                <Text style={styles.itemTitle}>{order}:</Text>
                                <AntDesign name="closecircleo" size={25} color="red" />
                            </View>
                        </View>
                    ))}
                </>
            );
        }

        if (typeof value === 'object' && value.elPlazoDeValidez) {
            const { validoDias, validezDesde } = value.elPlazoDeValidez;

            if (validoDias === null && validezDesde === null) {
                return null;
            }

            if (validezDesde === 'verNorma') {
                return (
                    <View style={styles.fondoValidezOrden}>
                        <Text style={styles.informacionHTML}>Ver Norma de la Mutual</Text>
                    </View>
                );
            }

            if (isValueValid(validoDias) || isValueValid(validezDesde)) {
                return (
                    <View style={styles.fondoValidezOrden}>
                        <Text style={styles.informacionTextoValidez}>
                            El plazo de validez de orden es de {isValueValid(validoDias) ? (
                                <Text style={styles.informacion}>{validoDias}</Text>
                            ) : (
                                <Text style={styles.informacion}>Información no disponible</Text>
                            )}
                            {isValueValid(validoDias) && ' días desde la fecha de '}
                            {isValueValid(validezDesde) ? (
                                <Text style={styles.informacion}> {validezDesde}.</Text>
                            ) : (
                                <Text style={styles.informacion}>Información no disponible.</Text>
                            )}
                        </Text>
                    </View>
                );
            }

            return null;
        }

        return <Text>{typeof value === 'object' ? JSON.stringify(value) : value}</Text>;
    };

    return (
        <View style={isCollapsible ? styles.contenedorConLinea : styles.contenedor}>
            {isCollapsible ? (
                <>
                    <TouchableOpacity style={styles.desplegable} onPress={onToggle}>
                        {showLabel && <Text style={styles.titulo}>{label}:</Text>}
                        <AntDesign name={collapsed ? "downcircleo" : "upcircleo"} size={25} color="#FF893E" marginTop={10} />
                    </TouchableOpacity>
                    <Collapsible collapsed={collapsed} style={styles.fondo}>
                        {Array.isArray(value) ? renderValue() : <Text style={styles.informacionHTML}>{renderValue()}</Text>}
                    </Collapsible>
                </>
            ) : (
                <>
                    {showLabel && <Text style={styles.titulo}>{label}:</Text>}
                    {Array.isArray(value) ? renderValue() : <Text style={styles.informacion}>{renderValue()}</Text>}
                </>
            )}
        </View>
    );
};

export default RenderField;
