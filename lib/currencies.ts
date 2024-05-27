export const Currencies = [
    { value: "PHP", label: '₱ Peso', locale: "en-PH"  },
    { value: "USD", label: '$ Dollar', locale: "en-US"  },
    { value: "EUR", label: '€ Euro', locale: "de-DE"  },
    { value: "JPY", label: '¥ Japan', locale: "ja-JP"  },
    { value: "GBP", label: '₤ Pound', locale: "en-GB"  },

    
]


export type Currency = (typeof Currencies)[0];
