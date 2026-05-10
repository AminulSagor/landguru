// export type UnlockFeatureSummary = {
//     id: string;
//     unlockFeaturesAmount: string;
//     createdAt: string;
//     updatedAt: string;
// }

type paymentMethod = {
    code: string;
    name: string;
}
export type UnlockFeatureSummary = {
    success: boolean;
    data:{
        userId: string;
        isLimited: boolean;
        unlockFeaturesAmount: string;
        paymentMethods: paymentMethod[];
    }
}

export type PaymentStatusPayload ={
    tranId: string;
}
export type CreateSessionResponse = {
    paymentId: string;
    tranId: string;
    sessionKey: string;
    gatewayUrl: string;
    status: string;
}

// export type UnlockFeaturesFinal