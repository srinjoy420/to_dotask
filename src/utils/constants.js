export const UserRolesEnum={
    ADMIN: 'admin',
    PROJECT_ADMIN: 'project-admin',
    MEMBER:"member"
}

export const AvalibleUserRoles=Object.values(UserRolesEnum) //it is a array

export const TaskStatusEnum={
    TODO:"todo",
    IN_PROGRESS:"in-progress",
    DONE:"done",

};
export const AvalibleTaskStatus=Object.values(TaskStatusEnum)