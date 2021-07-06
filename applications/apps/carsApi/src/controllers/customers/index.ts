import { getConnection } from "../../db"
export async function getCustomers(customerName: string) {
    if (typeof customerName !== 'string') return;
    const [result] = await getConnection().execute("select * from customers where first_name = ?", [customerName])
    return { ...result, role: getRoleByJobTitle(roleMapping, result["jobTitle"]) }
}

export async function getCustomerByCity(city: string) {
    if (typeof city !== 'string') return;
    const [result] = await getConnection().execute("select * from customers where city = ?", [city])
    if (!Array.isArray(result)) return [];

    const customers = result.map(customer => {
        return {
            ...customer, role: getRoleByJobTitle(roleMapping, customer["job_title"]),
            mail: getEmailAddress(customer["first_name"], customer["last_name"], "gmail")
        }
    })
    return customers;
}

const DefaultRole = "Viewer"

const roleMapping = {
    "Purchasing Representative": "Admin",
    "Owner": "Admin",
    "Purchasing Manager": DefaultRole
}
type RoleMapping = typeof roleMapping;
function getRoleByJobTitle(roleMapping: RoleMapping, jobTitle: string) {
    if (!jobTitle) return DefaultRole
    return roleMapping[jobTitle]
}
export function getEmailAddress(first: string, last: string, emailDomain: string) {
    if (!first || !last || !emailDomain) return;
    return `${first}_${last}@${emailDomain}.com`;
}