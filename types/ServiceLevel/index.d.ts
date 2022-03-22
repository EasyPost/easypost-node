import { ServiceLevelAmazonMws } from './AmazonMws';
import { ServiceLevelAramex } from './Aramex';
import { ServiceLevelArrowXL } from './ArrowXL';
import { ServiceLevelAsendia } from './Asendia';
import { ServiceLevelAustraliaPost } from './AustraliaPost';
import { ServiceLevelAxlehireV3 } from './AxlehireV3';
import { ServiceLevelBorderGuru } from './BorderGuru';
import { ServiceLevelCanadaPost } from './CanadaPost';
import { ServiceLevelColumbusLastMile } from './ColumbusLastMile';
import { ServiceLevelColisPrive } from './ColisPrive';
import { ServiceLevelCouriersPlease } from './CouriersPlease';
import { ServiceLevelDaiPost } from './DaiPost';
import { ServiceLevelDeliv } from './Deliv';
import { ServiceLevelDeutschePost } from './DeutschePost';
import { ServiceLevelDeutschePostUK } from './DeutschePostUK';
import { ServiceLevelDHLEcommerceAsia } from './DHLEcommerceAsia';
import { ServiceLevelDhlEcs } from './DhlEcs';
import { ServiceLevelDHLExpress } from './DHLExpress';
import { ServiceLevelDicom } from './Dicom';
import { ServiceLevelDPD } from './DPD';
import { ServiceLevelDPDUK } from './DPDUK';
import { ServiceLevelEstafeta } from './Estafeta';
import { ServiceLevelFastway } from './Fastway';
import { ServiceLevelFedEx } from './FedEx';
import { ServiceLevelFedExCrossBorder } from './FedExCrossBorder';
import { ServiceLevelFedExSameDayCity } from './FedExSameDayCity';
import { ServiceLevelFedexSmartPost } from './FedexSmartPost';
import { ServiceLevelGlobegistics } from './Globegistics';
import { ServiceLevelGSO } from './GSO';
import { ServiceLevelHermes } from './Hermes';
import { ServiceLevelInterlinkExpress } from './InterlinkExpress';
import { ServiceLevelLaserShipV2 } from './LaserShipV2';
import { ServiceLevelLiefery } from './Liefery';
import { ServiceLevelLoomisExpress } from './LoomisExpress';
import { ServiceLevelLSO } from './LSO';
import { ServiceLevelNewgistics } from './Newgistics';
import { ServiceLevelOnTrac } from './OnTrac';
import { ServiceLevelOnTracDirectPost } from './OnTracDirectPost';
import { ServiceLevelOsmWorldwide } from './OsmWorldwide';
import { ServiceLevelPurolator } from './Purolator';
import { ServiceLevelRoyalMail } from './RoyalMail';
import { ServiceLevelRRDonnelley } from './RRDonnelley';
import { ServiceLevelOmniParcel } from './OmniParcel';
import { ServiceLevelSpeeDee } from './SpeeDee';
import { ServiceLevelSprintShip } from './SprintShip';
import { ServiceLevelStarTrack } from './StarTrack';
import { ServiceLevelTForce } from './TForce';
import { ServiceLevelUDS } from './UDS';
import { ServiceLevelUPS } from './UPS';
import { ServiceLevelUPSMailInnovations } from './UPSMailInnovations';
import { ServiceLevelUSPS } from './USPS';
import { ServiceLevelVeho } from './Veho';

/**
 * @see https://www.easypost.com/docs/api/node#service-levels
 */
export declare type ServiceLevel =
  | ServiceLevelAmazonMws
  | ServiceLevelAramex
  | ServiceLevelArrowXL
  | ServiceLevelAsendia
  | ServiceLevelAustraliaPost
  | ServiceLevelAxlehireV3
  | ServiceLevelBorderGuru
  | ServiceLevelCanadaPost
  | ServiceLevelAsendia
  | ServiceLevelColumbusLastMile
  | ServiceLevelColisPrive
  | ServiceLevelCouriersPlease
  | ServiceLevelDaiPost
  | ServiceLevelDeliv
  | ServiceLevelDeutschePost
  | ServiceLevelDeutschePostUK
  | ServiceLevelDHLEcommerceAsia
  | ServiceLevelDhlEcs
  | ServiceLevelDHLExpress
  | ServiceLevelDicom
  | ServiceLevelDPD
  | ServiceLevelDPDUK
  | ServiceLevelEstafeta
  | ServiceLevelFastway
  | ServiceLevelFedEx
  | ServiceLevelFedExCrossBorder
  | ServiceLevelFedExSameDayCity
  | ServiceLevelFedexSmartPost
  | ServiceLevelGlobegistics
  | ServiceLevelGSO
  | ServiceLevelHermes
  | ServiceLevelInterlinkExpress
  | ServiceLevelLaserShipV2
  | ServiceLevelLiefery
  | ServiceLevelLoomisExpress
  | ServiceLevelLSO
  | ServiceLevelNewgistics
  | ServiceLevelOnTrac
  | ServiceLevelOnTracDirectPost
  | ServiceLevelOsmWorldwide
  | ServiceLevelPurolator
  | ServiceLevelRoyalMail
  | ServiceLevelRRDonnelley
  | ServiceLevelOmniParcel
  | ServiceLevelSpeeDee
  | ServiceLevelSprintShip
  | ServiceLevelStarTrack
  | ServiceLevelTForce
  | ServiceLevelUDS
  | ServiceLevelUPS
  | ServiceLevelUPSMailInnovations
  | ServiceLevelUSPS
  | ServiceLevelVeho;
