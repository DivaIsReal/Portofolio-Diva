import {
  SiLinux,
  SiCisco,
  SiWireshark,
  SiKalilinux,
  SiOpenvpn,
  SiDocker,
  SiKubernetes,
  SiProxmox,
  SiMikrotik,
  SiSplunk,
  SiAmazonwebservices,
  SiMetasploit,
  SiOwasp,
  SiPortswigger,
  SiAnsible,
  SiTerraform,
  SiGithub,
  SiPrometheus,
  SiGrafana,
  SiUbuntu,
  SiElasticsearch,
} from "react-icons/si";
import { FaNetworkWired, FaMicrosoft } from "react-icons/fa";
import {
  BsShieldFillCheck,
  BsShieldFillExclamation,
  BsSearch,
  BsActivity,
  BsShieldLock,
} from "react-icons/bs";

export type SkillProps = {
  [key: string]: {
    icon: JSX.Element;
    background: string;
    color: string;
    isActive?: boolean;
  };
};

const iconSize = 26;

export const STACKS: SkillProps = {
  Linux: {
    icon: <SiLinux size={iconSize} />,
    background: "bg-yellow-400",
    color: "text-yellow-400",
    isActive: true,
  },
  GNS3: {
    icon: <FaNetworkWired size={iconSize} />,
    background: "bg-blue-600",
    color: "text-blue-400",
    isActive: true,
  },
  Proxmox: {
    icon: <SiProxmox size={iconSize} />,
    background: "bg-orange-600",
    color: "text-orange-500",
    isActive: true,
  },
  Cisco: {
    icon: <SiCisco size={iconSize} />,
    background: "bg-blue-700",
    color: "text-blue-400",
    isActive: true,
  },
  MikroTik: {
    icon: <SiMikrotik size={iconSize} />,
    background: "bg-red-600",
    color: "text-red-400",
    isActive: true,
  },
  Wireshark: {
    icon: <SiWireshark size={iconSize} />,
    background: "bg-blue-500",
    color: "text-blue-300",
    isActive: true,
  },
  "Kali Linux": {
    icon: <SiKalilinux size={iconSize} />,
    background: "bg-slate-800",
    color: "text-blue-400",
    isActive: true,
  },
  Metasploit: {
    icon: <SiMetasploit size={iconSize} />,
    background: "bg-blue-900",
    color: "text-blue-300",
    isActive: true,
  },
  "Burp Suite": {
    icon: <SiPortswigger size={iconSize} />,
    background: "bg-orange-600",
    color: "text-orange-400",
    isActive: true,
  },
  OWASP: {
    icon: <SiOwasp size={iconSize} />,
    background: "bg-blue-700",
    color: "text-blue-300",
    isActive: true,
  },
  OpenVPN: {
    icon: <SiOpenvpn size={iconSize} />,
    background: "bg-orange-500",
    color: "text-orange-300",
    isActive: true,
  },
  Docker: {
    icon: <SiDocker size={iconSize} />,
    background: "bg-blue-500",
    color: "text-blue-300",
    isActive: true,
  },
  Kubernetes: {
    icon: <SiKubernetes size={iconSize} />,
    background: "bg-blue-600",
    color: "text-blue-300",
    isActive: true,
  },
  "Microsoft Azure": {
    icon: <FaMicrosoft size={iconSize} />,
    background: "bg-blue-500",
    color: "text-blue-300",
    isActive: true,
  },
  AWS: {
    icon: <SiAmazonwebservices size={iconSize} />,
    background: "bg-orange-400",
    color: "text-orange-300",
    isActive: true,
  },
  Wazuh: {
    icon: <BsShieldFillCheck size={iconSize} />,
    background: "bg-teal-600",
    color: "text-teal-300",
    isActive: true,
  },
  Splunk: {
    icon: <SiSplunk size={iconSize} />,
    background: "bg-green-600",
    color: "text-green-300",
    isActive: true,
  },
  Nmap: {
    icon: <BsSearch size={iconSize} />,
    background: "bg-slate-700",
    color: "text-slate-300",
    isActive: true,
  },
  Suricata: {
    icon: <BsShieldFillExclamation size={iconSize} />,
    background: "bg-red-700",
    color: "text-red-300",
    isActive: true,
  },
  Ansible: {
    icon: <SiAnsible size={iconSize} />,
    background: "bg-red-600",
    color: "text-red-300",
    isActive: true,
  },
  Terraform: {
    icon: <SiTerraform size={iconSize} />,
    background: "bg-violet-600",
    color: "text-violet-300",
    isActive: true,
  },
  GitHub: {
    icon: <SiGithub size={iconSize} />,
    background: "bg-slate-800",
    color: "text-neutral-100",
    isActive: true,
  },
  Prometheus: {
    icon: <SiPrometheus size={iconSize} />,
    background: "bg-orange-600",
    color: "text-orange-300",
    isActive: true,
  },
  Grafana: {
    icon: <SiGrafana size={iconSize} />,
    background: "bg-orange-500",
    color: "text-orange-200",
    isActive: true,
  },
  "Ubuntu Server": {
    icon: <SiUbuntu size={iconSize} />,
    background: "bg-orange-500",
    color: "text-orange-200",
    isActive: true,
  },
  Nagios: {
    icon: <BsActivity size={iconSize} />,
    background: "bg-slate-600",
    color: "text-slate-200",
    isActive: true,
  },
  Fail2Ban: {
    icon: <BsShieldLock size={iconSize} />,
    background: "bg-slate-800",
    color: "text-red-400",
    isActive: true,
  },
  "ELK Stack": {
    icon: <SiElasticsearch size={iconSize} />,
    background: "bg-yellow-500",
    color: "text-yellow-200",
    isActive: true,
  },
};
