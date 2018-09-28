pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


/**
 * @title CryptoDoggos: a fictional ERC721 token
 */
contract CryptoDoggos is ERC721Token, Ownable {
  /* The DNA of our doggos */
  struct Doggo {
    string name;
    uint8 age;
    uint8 cuteness;
    uint8 size;
    uint8 color;
  }

  /* Our doggos are stored here */
  Doggo[] public doggos;

  constructor() public ERC721Token("CryptoDoggos", "WOOF") {
  }

  /**
   * @dev Creates a new doggo
   * @param player The player who will own the new doggo
   * @param name The name of the doggo
   * @param age The age of the doggo
   * @param cuteness The level of cuteness of the doggo
   * @param size The size of the doggo
   * @param color The color of the doggo
   */
  function createDoggo(
    address player,
    string name,
    uint8 age,
    uint8 cuteness,
    uint8 size,
    uint8 color
  ) external onlyOwner() {
    uint doggoId = doggos.push(
      Doggo({
        name: name,
        age: age,
        cuteness: cuteness,
        size: size,
        color: color
      })
    ) - 1;

    _mint(player, doggoId);
  }

  /**
   * @dev Gets a doggo
   * @param doggoId The id of a doggo
   * @return The name and the age of the doggo
   */
  function getDoggo(
    uint doggoId
  ) external view returns (
    string name,
    uint8 age,
    uint8 cuteness,
    uint8 size,
    uint8 color
  ) {
    return (
      doggos[doggoId].name,
      doggos[doggoId].age,
      doggos[doggoId].cuteness,
      doggos[doggoId].size,
      doggos[doggoId].color
    );
  }
}
