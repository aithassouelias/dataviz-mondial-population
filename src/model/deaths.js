// Script contenant l'ensemble des méthodes pour les données de la table deaths
class Death {
    _iddeath;
    _region_code;
    _region_name;
    _country_code;
    _country_name;
    _year;
    _sex;
    _age_group_code;
    _age_group;
    _number;

    constructor(iddeath, region_code, region_name, country_code, country_name, year, sex, age_group_code, age_group, number) {
        this._iddeath = iddeath;
        this._region_code = region_code;
        this._region_name = region_name;
        this._country_code = country_code;
        this._country_name = country_name;
        this._year = year;
        this._sex = sex;
        this._age_group_code = age_group_code;
        this._age_group = age_group;
        this._number = number;
    }
    
    get iddeath() {
        return this._iddeath;
    }
    
    get region_code() {
        return this._region_code;
    }
    
    get region_name() {
        return this._region_name;
    }
    
    get country_code() {
        return this._country_code;
    }
    
    get country_name() {
        return this._country_name;
    }
    
    get year() {
        return this._year;
    }
    
    get sex() {
        return this._sex;
    }
    
    get age_group_code() {
        return this._age_group_code;
    }
    
    get age_group() {
        return this._age_group;
    }
    
    get number() {
        return this._number;
    }
    
    set iddeath(iddeath) {
        this._iddeath = iddeath;
    }
    
    set region_code(region_code) {
        this._region_code = region_code;
    }
    
    set region_name(region_name) {
        this._region_name = region_name;
    }
    
    set country_code(country_code) {
        this._country_code = country_code;
    }
    
    set country_name(country_name) {
        this._country_name = country_name;
    }
    
    set year(year) {
        this._year = year;
    }
    
    set sex(sex) {
        this._sex = sex;
    }
    
    set age_group_code(age_group_code) {
        this._age_group_code = age_group_code;
    }
    
    set age_group(age_group) {
        this._age_group = age_group;
    }
    
    set number(number) {
        this._number = number;
    }
    

    /* Fonction getdeaths() permettant de récupérer les données de la table deaths */
    async getdeaths() {
        const { data: deaths, error } = await supabaseAuth
          .from('deaths')
          .select('*')
        return deaths
    }

    /* Fonction getdeathsByBankIncome permettant de récupérer le bank income et le nombre de naissance */
    async getdeathsByBankIncome() {
        const { data: deaths, error } = await supabaseAuth
            .from('deaths')
            .select("bank_income, value")
        return deaths
    }
    
    /* Fonction getdeathsByCountry permettant de récupérer le pays et le nombre de naissance */
    async getdeathsByCountry() {
        const { data: deaths, error } = await supabaseAuth
            .from('deaths')
            .select("country, value")
        return deaths
    }

    /* Fonction getdeathsnumbers permettant de récupérer le nombre de décès */
    async getDeathsValues() {
        const { data: deaths, error } = await supabaseAuth
            .from('deaths')
            .select("number")
        return deaths
    }

    async getDeathsValuesContinent(continent) {
        const { data: deaths, error } = await supabaseAuth
            .from('deaths')
            .select("number")
            .eq('region_name', continent)
        return deaths
    }

    /* Fonction getdeathsnumbers permettant de récupérer le nombre de décès pour les hommes */
    async getDeathsValuesMale() {
        const { data: deaths, error } = await supabaseAuth
            .from('deaths')
            .select("number")
            .eq('sex','Male')
            
        return deaths
    }

    async getDeathsValuesMaleContinent(continent) {
        const { data: deaths, error } = await supabaseAuth
            .from('deaths')
            .select("number")
            .eq('sex','Male')
            .eq('region_name', continent)
            
        return deaths
    }

    /* Fonction getdeathsnumbers permettant de récupérer le nombre de décès par année */
    async getDeathsValuesByYear() {
        const { data: deaths, error } = await supabaseAuth
            .from('deaths')
            .select("year, number")
        return deaths
    }

    /* Fonction getdeathsnumbers permettant de récupérer le nombre de décès pour les hommes par année */
    async getDeathsValuesMaleByYear() {
        const { data: deaths, error } = await supabaseAuth
            .from('deaths')
            .select("year, number")
            .eq('sex','Male')
        return deaths
    }

    async getDeathsValuesMaleByYearContinent(continent) {
        const { data: deaths, error } = await supabaseAuth
            .from('deaths')
            .select("year, number")
            .eq('sex','Male')
            .eq('region_name', continent)
        return deaths
    }

    /* Fonction getdeathsnumbers permettant de récupérer le nombre de décès pour les hommes par groupe d'âge */
    async getDeathsValuesMaleByAge() {
        const { data: deaths, error } = await supabaseAuth
            .from('deaths')
            .select("age_group, number")
            .eq('sex','Male')
        return deaths
    }

    async getDeathsValuesMaleByAgeContinent(continent) {
        const { data: deaths, error } = await supabaseAuth
            .from('deaths')
            .select("age_group, number")
            .eq('sex','Male')
            .eq('region_name', continent)
        return deaths
    }

    /* Fonction getdeathsnumbers permettant de récupérer le nombre de décès pour les femmes */
    async getDeathsValuesFemale() {
        const { data: deaths, error } = await supabaseAuth
            .from('deaths')
            .select("number")
            .eq('sex', 'Female')
            
        return deaths
    }

    /* Fonction getdeathsnumbers permettant de récupérer le nombre de décès pour les femmes */
    async getDeathsValuesFemaleContinent(continent) {
        const { data: deaths, error } = await supabaseAuth
            .from('deaths')
            .select("number")
            .eq('sex', 'Female')
            .eq('region_name', continent)
            
        return deaths
    }

    /* Fonction getdeathsnumbers permettant de récupérer le nombre de décès pour les femmes par année */
    async getDeathsValuesFemaleByYear() {
        const { data: deaths, error } = await supabaseAuth
            .from('deaths')
            .select("year, number")
            .eq('sex','Female')
        return deaths
    }

    /* Fonction getdeathsnumbers permettant de récupérer le nombre de décès pour les femmes par année */
    async getDeathsValuesFemaleByYearContinent(continent) {
        const { data: deaths, error } = await supabaseAuth
            .from('deaths')
            .select("year, number")
            .eq('sex','Female')
            .eq('region_name', continent)
        return deaths
    }


    /* Fonction getdeathsnumbers permettant de récupérer le nombre de décès pour les femmes par groupe d'âge */
    async getDeathsValuesFemaleByAge() {
        const { data: deaths, error } = await supabaseAuth
            .from('deaths')
            .select("age_group, number")
            .eq('sex', 'Female')
        return deaths
    }

    async getDeathsValuesFemaleByAgeContinent(continent) {
        const { data: deaths, error } = await supabaseAuth
            .from('deaths')
            .select("age_group, number")
            .eq('sex', 'Female')
            .eq('region_name', continent)
        return deaths
    }

    /* Fonction permettant de simuler le GROUP BY pour une colonne choisie */
    groupValueByColumn(column, deaths) {
        const deathsByColumn = deaths.reduce((acc, death) => {
            const arrColumn = death[column];
            const value = death.number;
            if (acc[arrColumn]) {
                acc[arrColumn] += value;
            } else {
                acc[arrColumn] = value;
            }
            return acc;
        }, {});
        return deathsByColumn;
    }

    /* Fonction permettant de simuler le GROUP BY pour avoir le total */
    groupValues(deaths) {
        const deathsTotal = deaths.reduce((acc, death) => {
            const value = death.number;
            return (acc || 0) + value;
        }, 0);
        return deathsTotal;
    }
    
}