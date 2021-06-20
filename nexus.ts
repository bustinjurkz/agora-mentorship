/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import * as Context from './src/context';

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {}

export interface NexusGenEnums {
  Services:
    | 'CAREER_DEVELOPMENT'
    | 'CAREER_PLANNING'
    | 'GENERAL'
    | 'MOCK_INTERVIEW'
    | 'SUCCESS_AT_WORK';
}

export interface NexusGenScalars {
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenObjects {
  Mentor: {
    // root type
    bio?: string | null; // String
    id: number; // Int!
    job_title_primary: string; // String!
    job_title_secondary?: string | null; // String
    name: string; // String!
    preferred_services: Array<NexusGenEnums['Services'] | null>; // [Services]!
    school: Array<string | null>; // [String]!
    school_major: string; // String!
    school_year?: number | null; // Int
  };
  Query: {};
}

export interface NexusGenInterfaces {}

export interface NexusGenUnions {}

export type NexusGenRootTypes = NexusGenObjects;

export type NexusGenAllTypes = NexusGenRootTypes &
  NexusGenScalars &
  NexusGenEnums;

export interface NexusGenFieldTypes {
  Mentor: {
    // field return type
    bio: string | null; // String
    id: number; // Int!
    job_title_primary: string; // String!
    job_title_secondary: string | null; // String
    name: string; // String!
    preferred_services: Array<NexusGenEnums['Services'] | null>; // [Services]!
    school: Array<string | null>; // [String]!
    school_major: string; // String!
    school_year: number | null; // Int
  };
  Query: {
    // field return type
    Mentor: NexusGenRootTypes['Mentor'] | null; // Mentor
  };
}

export interface NexusGenFieldTypeNames {
  Mentor: {
    // field return type name
    bio: 'String';
    id: 'Int';
    job_title_primary: 'String';
    job_title_secondary: 'String';
    name: 'String';
    preferred_services: 'Services';
    school: 'String';
    school_major: 'String';
    school_year: 'Int';
  };
  Query: {
    // field return type name
    Mentor: 'Mentor';
  };
}

export interface NexusGenArgTypes {}

export interface NexusGenAbstractTypeMembers {}

export interface NexusGenTypeInterfaces {}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false;
    resolveType: true;
    __typename: false;
  };
};

export interface NexusGenTypes {
  context: Context.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes:
    | NexusGenTypes['inputNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['scalarNames'];
  allOutputTypes:
    | NexusGenTypes['objectNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['unionNames']
    | NexusGenTypes['interfaceNames']
    | NexusGenTypes['scalarNames'];
  allNamedTypes:
    | NexusGenTypes['allInputTypes']
    | NexusGenTypes['allOutputTypes'];
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}

declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {}
  interface NexusGenPluginFieldConfig<
    TypeName extends string,
    FieldName extends string,
  > {}
  interface NexusGenPluginInputFieldConfig<
    TypeName extends string,
    FieldName extends string,
  > {}
  interface NexusGenPluginSchemaConfig {}
  interface NexusGenPluginArgConfig {}
}