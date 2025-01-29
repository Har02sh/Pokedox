# Use effect is a functionality or hook given by react to render a particular functionality when the component is renedered.
## syntax :-> useEffect(callback, dependency array)
# If dependency array is not given the functionality inside the callback of the useEffect will executed after every referesh or load of the component or load of any useState variable. 
# If the dependency array is empty then only when the page is reloaded the functionality will be executed.
# If the dependency array consists of a particular variable then when the state of that particular variable will change the functionality will be executed again.