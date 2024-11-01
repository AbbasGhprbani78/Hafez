
export function toFarsiNumber(number) {
    return number?.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
}

export function toEnglishNumber(number) {
    return number?.toString().replace(/[۰-۹]/g, d => '0123456789'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)]);
}


