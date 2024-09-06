import pandas as pd
import countries

file_name = "worldcities.csv"
df0 = pd.read_csv(file_name)

def get_data():
    # Convert dictionary to a list of tuples and create DataFrame
    df1 = pd.DataFrame(list(countries.countryMapping.items()), columns=['Country Name English', 'Country Name Chinese'])
    df2 = pd.DataFrame(list(countries.countries.items()), columns=['Continent', 'Country Name Chinese'])
    # print(df)
    # Explode the 'Country Name Chinese' column
    df2 = df2.explode('Country Name Chinese')

    # Optionally, reset the index if you want a clean consecutive index
    df2.reset_index(drop=True, inplace=True)
    # for i in range(len(df2)):
    #     if df2['Country Name Chinese'][i] not in set(df1['Country Name Chinese'].unique()):
    #         print(df2['Country Name Chinese'][i])

    df_merge = df2.merge(df1, left_on='Country Name Chinese', right_on='Country Name Chinese')
    # for i in range(len(df_merge)):
    #     if len(df_merge['Country Name English'][i]) > 1:
    #         print(df_merge['Country Name English'][i])

    set_df1 = set(df1['Country Name Chinese'])
    set_df2 = set(df2['Country Name Chinese'])
    # Countries in df1 not in df2
    unique_to_df1 = set_df1 - set_df2
    # print(unique_to_df1)
    # Countries in df2 not in df1
    unique_to_df2 = set_df2 - set_df1
    # print(unique_to_df2)

    df2.duplicated(subset=['Country Name Chinese'])
    # print(df2[df2.duplicated('Country Name Chinese', keep=False) == True])

    # print(df_merge)

    df_total = df_merge.merge(df0, left_on='Country Name English', right_on='country', how='outer', indicator=True)

    # print(df_total)

    # Display rows that did not join successfully from both sides
    unmatched_left = df_total[df_total['_merge'] == 'left_only']
    unmatched_right = df_total[df_total['_merge'] == 'right_only']

    # print("Rows unmatched from df_merge (left only):")
    # print(unmatched_right.shape)
    # print(unmatched_right['city'].unique())


    # print("Rows unmatched from df0 (right only):")
    # print(unmatched_right.shape)

    df_both = df_total[df_total['_merge'] == 'both']
    df_both.to_csv("cities.csv", index=False)
    return df_both

get_data()