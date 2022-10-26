def compare(a, operator, b):

    if(operator == '>'):
        return a > b

    elif(operator == '<'):
        return a < b

    elif(operator == '='):
        return a == b


def user_matches_rule(user, rules):
    
    """
    user contains gender, birthdate
    rules: [ [ { feature: 'age', operator: '=', value: '30'  } ] ]
    """
    # TODO
        # if no rule is there, allow all users
    if(len(rules) is 0):
        return True

    for or_rules in rules:

        print(or_rules)

        and_rules_matched = True

        for and_rule in or_rules:

            print('%s %s %s', user[and_rule['feature']], and_rule['operator'], and_rule['value'])
            if(compare(user[and_rule['feature']], and_rule['operator'], and_rule['value']) is False):

                and_rules_matched = False
                break

        if(and_rules_matched):
            print('and_rule_matched = %s', and_rules_matched)
            return True

    return False

result = user_matches_rule(user={'age': 21, 'gender': 'male'}, rules=[[
    {
        "feature": "gender",
        "value": "male",
        "operator": "="
    }
    , 
    {
        "feature": "age",
        "value": "50",
        "operator": "<"
    }
    , 
    {
        "feature": "age",
        "value": "20",
        "operator": ">"
    }
    ], [
    {
        "feature": "gender",
        "value": "female",
        "operator": "="
    }
    , 
    {
        "feature": "age",
        "value": "40",
        "operator": "<"
    }
    , 
    {
        "feature": "age",
        "value": "30",
        "operator": ">"
    }
    ]])
print(result)